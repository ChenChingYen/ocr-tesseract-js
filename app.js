const fileSelector = document.querySelector('input');
const start = document.querySelector('button');
const img = document.querySelector('img');
const progress = document.querySelector('.progress');
const textarea = document.querySelector('textarea');

fileSelector.onchange = () => {
    var file = fileSelector.files[0];
    var imgURL = window.URL.createObjectURL(new Blob([file], {type:'image/jpg'}))
    // console.log(imgURL);
    img.src = imgURL;
}

start.onclick = () => {
    textarea.innerText = '';
    Tesseract.recognize(fileSelector.files[0], 'eng', {
        logger: m => {
            // console.log(m.status);
            if(m.status == 'recognizing text'){
                progress.innerHTML = m.status + '   ' + m.progress;
            }else{
                progress.innerHTML = m.status;
            }
        }
    }).then(({ data: { text } }) => {
        console.log(text);
        textarea.innerHTML = text;
        progress.innerHTML = 'Done';
    })
}