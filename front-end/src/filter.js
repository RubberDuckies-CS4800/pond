export function setInputFilter(textbox, property){
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (isCorrect(this.value)) {
                console.log(this.value);
                this.oldValue = this.value;
                let oldStart = this.oldSelectionStart;
                let oldEnd = this.oldSelectionEnd;
                this.oldSelectionStart = oldStart;
                this.oldSelectionEnd = oldEnd;
            } else if (property) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

function isCorrect(value){
    let regex = /^[A-Z0-9]{0,5}$/;
    return regex.test(value); 
}