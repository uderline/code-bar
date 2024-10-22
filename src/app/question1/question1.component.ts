import {Component, ElementRef, HostListener, QueryList, ViewChildren} from '@angular/core';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {BarcodeFormat} from "@zxing/library";

@Component({
    selector: 'app-question1',
    standalone: true,
    imports: [
        ZXingScannerModule,
    ],
    templateUrl: './question1.component.html',
    styleUrl: './question1.component.css'
})
export class Question1Component {
    @ViewChildren('inputs') inputs?: QueryList<ElementRef<HTMLInputElement>>;

    protected readonly BarcodeFormat = BarcodeFormat;

    availableAnswers = [
        {label: 'Coucou', value: 1},
        {label: 'Salut', value: 2},
        {label: 'Hello', value: 3},
    ];
    selectedAnswer?: { label: string; value: number };
    selectedAnswerIndex = -1;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            this.selectedAnswerIndex++;
            if (this.selectedAnswerIndex >= this.availableAnswers.length) {
                this.selectedAnswerIndex = 0;
            }
            this.selectedAnswer = this.availableAnswers[this.selectedAnswerIndex];
        }
    }

    onCodeResult(args: string) {
        const tabCount = args.split('').filter((char) => char === '\t').length;
        const input = this.inputs?.get(tabCount - 1)?.nativeElement;
        input?.select();

        const selectedAnswer = this.availableAnswers.find((answer) => answer.value === Number(input?.value));
        if (selectedAnswer) {
            this.submit(selectedAnswer);
        }
    }

    submit(selectedAnswer: { label: string; value: number }) {
        this.inputs?.forEach((input) => {
            if (input.nativeElement.value === selectedAnswer.value.toString()) {
                input.nativeElement.select();
            }
        });

        // Do something with the selected answer like submit, go to next page etc.
        this.selectedAnswer = selectedAnswer;
    }

    onChange(value: number) {
        const selectedAnswer = this.availableAnswers.find((answer) => answer.value === value);
        if (selectedAnswer) {
            this.submit(selectedAnswer);
        }
    }
}
