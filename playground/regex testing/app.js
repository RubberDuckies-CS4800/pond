function setInputFilter (textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.oldSelectionStart;
                this.oldSelectionEnd = this.oldSelectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

setInputFilter(document.getElementById("roomCodeTextBox"), function(value) {
    let regex = /^[A-Z0-9]{0,5}$/;
    return regex.test(value); 
});

console.log("testing testing 123");