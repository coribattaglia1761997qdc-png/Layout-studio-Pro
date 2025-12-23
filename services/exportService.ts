
import { Document, Packer, Paragraph, TextRun, AlignmentType, SpaceType } from 'docx';
import saveAs from 'file-saver';
import { toJpeg } from 'html-to-image';
import { PaperData } from '../types';

// Constants for docx font sizes (half-points)
const SIZE_3 = 32;
const SIZE_S4 = 24;
const SIZE_5 = 21;
const SIZE_S5 = 18;

export const exportToDocx = async (data: PaperData) => {
  const children: Paragraph[] = [];

  // Title
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 240 },
    children: [new TextRun({ text: data.title, size: SIZE_3, bold: true, font: "SimHei" })],
  }));

  // Authors
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: data.authors.join(' '), size: SIZE_S4, font: "SimSun" })],
  }));

  // Abstract Label & Text
  if (data.abstract) {
    children.push(new Paragraph({
      alignment: AlignmentType.BOTH,
      children: [
        new TextRun({ text: "摘要：", size: SIZE_S5, bold: true, font: "SimHei" }),
        new TextRun({ text: data.abstract, size: SIZE_S5, font: "SimSun" })
      ],
    }));
  }

  // Separator
  children.push(new Paragraph({ spacing: { after: 400 } }));

  // Body content parsing (improved)
  const lines = data.body.split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('# ')) {
      children.push(new Paragraph({
        spacing: { before: 240, after: 120 },
        children: [new TextRun({ text: trimmed.replace('# ', ''), size: SIZE_S4, bold: true, font: "SimHei" })],
      }));
    } else if (trimmed.startsWith('## ')) {
      children.push(new Paragraph({
        spacing: { before: 120, after: 60 },
        children: [new TextRun({ text: trimmed.replace('## ', ''), size: SIZE_5, bold: true, font: "SimHei" })],
      }));
    } else {
      children.push(new Paragraph({
        alignment: AlignmentType.BOTH,
        indent: { firstLine: 420 }, // 2 chars indent
        children: [new TextRun({ text: trimmed, size: SIZE_5, font: "SimSun" })],
      }));
    }
  });

  // References
  if (data.references.length > 0) {
    children.push(new Paragraph({
      spacing: { before: 400, after: 120 },
      children: [new TextRun({ text: "参考文献", size: SIZE_S4, bold: true, font: "SimHei" })],
    }));

    data.references.forEach((ref, idx) => {
      children.push(new Paragraph({
        children: [new TextRun({ text: ref.startsWith('[') ? ref : `[${idx+1}] ${ref}`, size: SIZE_5, font: "SimSun" })],
      }));
    });
  }

  const doc = new Document({
    sections: [{
      properties: { page: { margin: { top: '4.35cm', bottom: '4.35cm', left: '3.25cm', right: '3.25cm' } } },
      children: children,
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.title || 'academic_export'}.docx`);
};

export const copyToWeChat = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const html = element.innerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const textBlob = new Blob([element.innerText], { type: 'text/plain' });
    const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': textBlob })];
    await navigator.clipboard.write(data);
    alert('Format copied! You can now paste directly into the WeChat editor or any rich text field.');
  } catch (err) {
    console.error('Copy failed', err);
    alert('Copy failed. Please try again or use another browser.');
  }
};

export const exportToImage = async (elementId: string) => {
  const node = document.getElementById(elementId);
  if (!node) return;
  try {
    const dataUrl = await toJpeg(node, { quality: 1, backgroundColor: '#fff', pixelRatio: 2 });
    saveAs(dataUrl, 'share_preview.jpg');
  } catch (e) {
    console.error("Image Export Error:", e);
  }
};

export const exportToPdf = () => window.print();
