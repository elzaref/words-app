import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  selectedFile: File | null = null;
  fileContent: string | null = null;
  wordCounts: { word: string; count: number }[] | null = null;
  errorMessage: string | null = null;
  constructor() { }

  ngOnInit(): void {
  }
  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    this.errorMessage = null;
  }

  calculateRepeatedWords() {
    if (this.selectedFile) {
      if (this.selectedFile.type !== 'text/plain') {
        this.errorMessage = 'Please select a .txt file.';
        return;
      }
      
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.fileContent = fileReader.result as string;
        if (this.fileContent.trim().length === 0) {
          this.errorMessage = 'The selected file is empty.';
          return;
        }
        this.wordCounts = this.getWordCounts(this.fileContent);
      };
      
      fileReader.readAsText(this.selectedFile);
    }
  }

  getWordCounts(content: string): { word: string; count: number }[] {
    const words = content.split(/\s+/);
    const wordCounts: { [word: string]: number } = {};
    
    for (const word of words) {
      if (wordCounts[word]) {
        wordCounts[word]++;
      } else {
        wordCounts[word] = 1;
      }
    }
    return Object.keys(wordCounts).map(word => ({ word, count: wordCounts[word] }));
  }
}

