/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebContainer } from '@webcontainer/api';
import { useEffect, useState } from 'react';
import { RefreshCw, AlertOctagon } from 'lucide-react';
import { cn } from '../lib/utils';

interface PreviewFrameProps {
  files: any[]; // Expect: { path: string, content: string }[]
  webContainer: WebContainer;
}

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  function hasPackageJson(files: any[]): boolean {
    return files.some(f => f.path === 'package.json');
  }

 async function mountFiles() {
  const fileSystem: Record<string, any> = {};

  files.forEach(({ path, content }) => {
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    fileSystem[normalizedPath] = { file: { contents: content } };
  });

  await webContainer.mount(fileSystem);
}


  async function startDynamicPreview() {
    try {
      await mountFiles();

      const install = await webContainer.spawn('npm', ['install']);
      install.output.pipeTo(new WritableStream({
        write(data) {
          console.log(`[npm install]: ${data}`);
        }
      }));
      const code = await install.exit;
      if (code !== 0) throw new Error('npm install failed');

      const dev = await webContainer.spawn('npm', ['run', 'dev', '--', '--host']);
      dev.output.pipeTo(new WritableStream({
        write(data) {
          console.log(`[npm run dev]: ${data}`);
        }
      }));

      webContainer.on('server-ready', (port, serverUrl) => {
        setUrl(serverUrl);
        setLoading(false);
      });
    } catch (err: any) {
      setError(err.message || 'Failed to run dynamic preview');
      setLoading(false);
    }
  }

 async function startStaticPreview() {
  try {
    await mountFiles();

    // Install serve explicitly to avoid interactive prompt
    const install = await webContainer.spawn('npm', ['install', 'serve']);
    install.output.pipeTo(new WritableStream({
      write(data) {
        console.log(`[npm install serve]: ${data}`);
      }
    }));
    const code = await install.exit;
    if (code !== 0) throw new Error('Failed to install serve');

    // Start static server
    const serve = await webContainer.spawn('npx', ['serve', '.', '--listen', '3000', '--no-clipboard']);
    serve.output.pipeTo(new WritableStream({
      write(data) {
        console.log(`[serve]: ${data}`);
      }
    }));

    webContainer.on('server-ready', (port, serverUrl) => {
      console.log(`Static server ready at ${serverUrl}`);
      setUrl(serverUrl);
      setLoading(false);
    });
  } catch (err: any) {
    console.error('Static preview error:', err);
    setError(err.message || 'Failed to run static preview');
    setLoading(false);
  }
}


  async function startPreview() {
    try {
      setLoading(true);
      setError(null);

      if (hasPackageJson(files)) {
        await startDynamicPreview();
      } else {
        await startStaticPreview();
      }
    } catch (err: any) {
      console.error('Preview error:', err);
      setError(err.message || 'Unknown error');
      setLoading(false);
    }
  }

  const handleRetry = () => {
    setRetryCount(c => c + 1);
  };

  useEffect(() => {
    if (files.length > 0 && webContainer) {
      startPreview();
    }
  }, [files, webContainer, retryCount]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-950 rounded-lg overflow-hidden border border-gray-800">
      {loading && (
        <div className="text-center p-6 flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-300 font-medium">Setting up preview environment...</p>
          <p className="text-sm text-gray-500">This might take a moment</p>
        </div>
      )}

      {error && (
        <div className="text-center p-6 bg-red-950/20 rounded-lg border border-red-900/50 max-w-md">
          <AlertOctagon className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-400 font-medium text-lg mb-2">Preview Error</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-gray-200 rounded-md transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      )}

      {url && !loading && !error && (
        <iframe
          src={url}
          className={cn(
            'w-full h-full border-0 transition-opacity duration-300',
            loading ? 'opacity-0' : 'opacity-100'
          )}
          title="Site Preview"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; xr-spatial-tracking"
        />
      )}
    </div>
  );
}
