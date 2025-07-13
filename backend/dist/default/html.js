"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basePrompt = void 0;
exports.basePrompt = `
<boltArtifact id="vanilla-ui-website-20250713153000" title="Aesthetic HTML/CSS/JS Website">
  <boltAction type="file" filePath="index.html"><![CDATA[
<!DOCTYPE html>
<html lang="en">
  <!-- full HTML content here -->
</html>
  ]]></boltAction>
  <boltAction type="file" filePath="style.css"><![CDATA[
/* full CSS content here */
  ]]></boltAction>
  <boltAction type="file" filePath="script.js"><![CDATA[
/* full JS content here */
  ]]></boltAction>
</boltArtifact>
`;
