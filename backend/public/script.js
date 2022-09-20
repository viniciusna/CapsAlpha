Quill.register('modules/cursors', QuillCursors);

var quill = new Quill('#textBox', {
    modules: {
        cursors: true,
        toolbar: false,
        'syntax': false
    },
    theme: 'bubble',
});

const ws = new WebSocket('ws://localhost:3000');

ws.onopen = function (e) {
    console.log('[open] Connection established')
};

ws.onmessage = function (event) {
    const changes = JSON.parse(event.data);
    const message = changes.ops
    const cursor = changes.cursor
    console.log(`[message] Data received from server:`, message);
    quill.updateContents(message);

    quillCursors.moveCursor('cursor', cursor)
};

ws.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.log('[close] Connection died');
    }
};

ws.onerror = function (error) {
    console.log(`[error] ${error.message}`);
};

let startSecond;
let startFive;
let start = 0;
let end = 0;
let deltaOps = [];

quill.on('text-change', (delta, oldDelta, source) => {
    if (source == 'user') {
        console.log(delta)
        ws.send(JSON.stringify({ ops: delta, cursor: 1 }))
        document.getElementById('viewBox').innerHTML = marked.parse(quill.getText())
    }
});

quill.on('selection-change', function (range, oldRange, source) {
    if (range) {
        ws.send(JSON.stringify({ ops: {}, cursor: range }))
    }
})

//  document.getElementById('textBox').onkeydown = function (e) {
//      document.getElementById('viewBox').innerHTML = marked.parse(document.getElementById('textBox').innerText);
//      if (start == 0 && end == 0) {
//          start = Date.now();
//          deltaOps = [];
//          quill.on('text-change', (delta) => {
//             if (source == 'user') {
//                 console.log(delta)
//                 ws.send(JSON.stringify(delta))
//               } 
//          });
//          startSecond = setTimeout(() => {
//              start = 0;
//              end = 0;
//              clearTimeout(startFive);
//              console.log('1000 -> ', deltaOps);
//              ws.send(JSON.stringify({ ops: deltaOps }))
//              deltaOps = []
//          }, 1000);
//          startFive = setTimeout(() => {
//              start = 0;
//              end = 0;
//              clearTimeout(startSecond);
//              console.log('5000 -> ', deltaOps);
//              ws.send(JSON.stringify({ ops: deltaOps }))
//              deltaOps = []
//          }, 3000);
//      }
//      else if (start != 0) {
//          end = Date.now()
//          const difTime = (end - start) / 1000;
//          //console.log(difTime);
//          if (difTime < 1) {
//              start = Date.now();
//              clearTimeout(startSecond);
//              startSecond = setTimeout(() => {
//                  start = 0;
//                  end = 0;
//                  clearTimeout(startFive);
//                  console.log('1000 -> ', deltaOps);
//                  ws.send(JSON.stringify({ ops: deltaOps }))
//                  deltaOps = []
//              }, 1000);
//          }
//      }
//  };

window.onload = (event) => {
    fetch("/get-document")
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            quill.updateContents(data)
        })
};

quillCursors = quill.getModule('cursors');

quillCursors.createCursor('cursor', 'User 2', 'blue')

document.getElementById('textBox').onkeydown = function (e) {
    document.getElementById('viewBox').innerHTML = marked.parse(document.getElementById('textBox').innerText);

    options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quill.getContents())
    }

    quillCursors.moveCursor('cursor')

    fetch("/save", options)
        .then((response) => response.json())
}

/* 
{
    type: "message",
        status: "Success",
            message: "Send data",
                params: {
        data: params.data,
      }
}
 */