from zipfile import ZipFile
import re
from pathlib import Path

path = Path('snalab1.docx')
xml = ZipFile(path).read('word/document.xml').decode('utf-8')
paragraphs = []
for p in re.findall(r'<w:p[\s\S]*?</w:p>', xml):
    text = re.sub(r'<[^>]+>', '', p)
    text = ' '.join(text.split())
    if text:
        paragraphs.append(text)
for para in paragraphs:
    print(para)
