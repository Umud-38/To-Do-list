// Variables
const content = document.querySelector('.content');
const text = document.querySelector('.text');
const rmvBtn = document.querySelector('.rmvBtn');
const button = document.querySelector('.button');
const sort = document.querySelector('.sort');
const tasks = document.querySelector('.tasks');

tasks.style.display = 'none';

// input value remove
rmvBtn.addEventListener('click', () => {
    text.value = '';
    text.focus();
});

// input add
function addTask() {
    // input visible&hidden
    if (content.style.display === 'none') {
        content.style.display = 'flex';
        text.focus();
        text.placeholder = '';
    }
    else {
        if (text.value != '') {
            content.style.display = 'none';
        }
        else {
            // alert('Please, enter something...!!');
            text.placeholder = "Please, enter something...";
            text.focus();
        }
    }

    if (text.value == '') return;

    // li tag (task)
    const task = document.createElement('li');
    task.classList.add('task');
    task.draggable = 'true';
    tasks.append(task);

    // li > p tag (paragraph)
    const taskText = document.createElement('p');
    taskText.classList.add('taskText');
    task.append(taskText);
    taskText.innerHTML = text.value;

    // li > img tag (remove button)
    const rmvTsk = document.createElement('div');
    rmvTsk.classList.add('rmvBtn');
    task.append(rmvTsk);
    text.value = '';
    
    // remove
    rmvTsk.addEventListener('click', () => {
        rmvTsk.parentElement.remove();
        if (tasks.children.length == 0) {
            tasks.style.display = 'none';
            content.style.display = 'flex';
            text.focus();
        }
    });

    tasks.style.display = 'block';
}

// Enter key and button click
document.body.addEventListener('keypress', (event) => {
    if (event.key == 'Enter') addTask();
});
button.addEventListener('click', () => {
    let keyEvent = new KeyboardEvent('keypress', { key: 'Enter' });
    document.body.dispatchEvent(keyEvent);
});

// sort tasks
let srt = 'increment';
sort.addEventListener('click', () => {
    const paragraph = document.querySelectorAll('.taskText');

    let arr = new Array();
    for (let i = 0; i < paragraph.length; i++) {
        arr[i] = paragraph[i].innerHTML;
    }

    if (srt == 'increment') {
        srt = 'decrement';
        sort.style.background = 'url(/Group\ 91.png)';
        sort.addEventListener('mouseout', (event) => {
            event.target.style.background = 'url(/Group\ 90.png)';
        });
        sort.addEventListener('mouseover', (event) => {
            event.target.style.background = 'url(/Group\ 91.png)';
        });

        // arr sort
        arr.sort((a, b) => {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        });
    }
    else {
        srt = 'increment';
        sort.style.background = 'url(/Group\ 34\ \(1\).png)';
        sort.addEventListener('mouseout', (event) => {
            event.target.style.background = 'url(/Group\ 34\ \(2\).png)';
        });
        sort.addEventListener('mouseover', (event) => {
            event.target.style.background = 'url(/Group\ 34\ \(2\).png)';
        });
        arr.sort((a, b) => {
            if (a < b)
                return 1;
            if (a > b)
                return -1;
            return 0;
        });
    }

    for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].innerHTML = arr[i];
    }
});