<template>
  <Layout>
    <div class="total-page">
      <div class="page">
        <div class="title">编辑区域</div>
        <div class="editor">
          <div class="editor-container" id="container"></div>
        </div>
      </div>
      <div class="page-show">
        <div class="subtitle">显示区域</div>
        <div class="content ql-editor" id="show-content"></div>
      </div>
    </div>
    <el-button type="primary" @click="convertToPDF">点击下载为pdf</el-button>
  </Layout>
</template>


<script>
import Editor from "miks-collaborative-editor";
import 'quill/dist/quill.snow.css'
import Layout from '../components/common/Layout'
import Quill from 'quill';
import ReconnectingWebSocket from "reconnecting-websocket"
import ShareDB from "sharedb/lib/client";
import EditorEvents from "miks-collaborative-editor/editor-events";
import 'miks-collaborative-editor/modules/task-list'
import richText from "rich-text";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
ShareDB.types.register(richText.type);

const axios = require('axios');
const FormData = require('form-data');
const base_url = '127.0.0.1:8080';
// The current user's info, must contain both id and name field.

export default {
  name: "ShareTest",
  components: {Layout},
  methods:{
    convertToPDF(){
      let element = document.getElementById('show-content')

      html2canvas(element).then((canvas) => {
        let pdf = new jsPDF('p', 'mm', 'a4')
        let imgData = canvas.toDataURL('image/png')

        pdf.addImage(imgData, 'PNG', 0, 0)
        pdf.save('download.pdf')
      })
    }
  },
  mounted() {
    let authors = [
      {
        id: 1,
        name: "User A"
      },
      {
        id: 2,
        name: "User B"
      },
      {
        id: 3,
        name: "User C"
      },
      {
        id: 4,
        name: "User D"
      },
      {
        id: 5,
        name: "User E"
      }
    ];

    let authorIndex = Math.ceil(Math.random() * 1000) % authors.length;


    let editorOptions = {
      authorship: {
        author: authors[authorIndex],
        authorColor: '#ed5634',
        colors: [
          "#f7b452",
          "#ef6c91",
          "#8e6ed5",
          "#6abc91",
          "#5ac5c3",
          "#7297e3",
          "#9bc86e",
          "#ebd562",
          "#d499b9"
        ],
        handlers: {
          getAuthorInfoById: (authorId) => {
            return new Promise((resolve, reject) => {

              let author = authors.find((a) => a.id + '' === authorId);

              console.log("user info retrieved from server: " + authorId);

              if (author) {
                resolve(author);
              } else {
                reject("user not found");
              }

            });
          }
        }
      },
      image: {
        handlers: {
          imageDataURIUpload: (dataURI) => {
            const url = "http://127.0.0.1:9001/api/upload";
            const formData = new FormData();
            //console.log(dataURI)
            formData.append('image', dataURItoBlob(dataURI), 'image.png');
            let urlInSys = "http://127.0.0.1:9001/api/uploads/";
            return new Promise((resolve) => {
              // 发起POST请求上传图片
              fetch(url, {
                method: 'POST',
                body: formData,
              })
                  .then(response => response.text())
                  .then(data => {
                    urlInSys = urlInSys + data
                    console.log(data); // 输出服务器返回的新文件名
                    resolve(urlInSys);
                  })
                  .catch(error => {
                    console.error('Error:', error);
                  });

            });
          },
          imageSrcUpload: (src) => {
            console.log('src');
            console.log(src);
            return new Promise((resolve) => {
              resolve('src');
            });
          },
          imageUploadError: (err) => {
            console.log("image upload error: " + err);
          }
        }
      }
    };

    function dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], {type: mimeString});
    }

    let toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      [{'header': 1}, {'header': 2}, {'header': 3}],
      [{'list': 'ordered'}, {'list': 'bullet'}, 'task-list', {'indent': '+1'}, {'indent': '-1'}],
      ['align', 'color', 'background'],
      ['blockquote', 'code-block', 'link', 'image']
    ];

    let quillOptions = {
      modules: {
        toolbar: toolbarOptions,
        'task-list': true
      },
      theme: 'snow'
    };

    let editor = new Editor("#container", editorOptions, quillOptions);

    editor.on(EditorEvents.imageSkipped, () => {
      console.log("image skipped");
    });

    editor.on(EditorEvents.documentLoaded, () => {
      console.log("document loaded");
    });

    editor.on(EditorEvents.synchronizationError, (err) => {
      console.log("connection error");
      console.log(err);
    });

    console.log("到这一步了")
    let websocketEndpoint = "ws://" + base_url;

    editor.syncThroughWebsocket(websocketEndpoint, "00", "00");

    let socket = new ReconnectingWebSocket(websocketEndpoint);

    let connection = new ShareDB.Connection(socket);

    let doc = connection.get("00", "00");

// Create a hidden quill editor to parse delta to html


    let editorContainer = document.createElement('div');
    editorContainer.style.display = 'none';
    console.log("到这一步了1111111")
    let quill = new Quill(editorContainer);
    console.log("到这一步了222222")
    doc.fetch((err) => {
      if (err) {
        console.log(err);
        return;
      }

      let delta = doc.data;
      quill.setContents(delta);
      console.log('到这一步了')
      let htmlContent = quill.root.innerHTML;
      let textContent = quill.getText()
      console.log("delta", delta)
      console.log("HTML 内容:", htmlContent);
      console.log("纯文本内容:", textContent);

      document.querySelector(".content").innerHTML = quill.root.innerHTML;

      doc.destroy();
      socket.close();
      editor.on(EditorEvents.editorTextChanged, (delta) => {
        let del = delta.oldDelta.compose(delta.delta)
        quill.setContents(del);
        document.querySelector(".content").innerHTML = quill.root.innerHTML;
      })
    });
  }
}
</script>

<style scoped>
.total-page {
  display: flex;
}
.page {
  width: 40%;
  padding: 20px;
}

.page-show {
  width: 40%;
  padding: 20px;
}

.page .title {
  text-align: center;
  font-size: 24px;
}

.page-show .subtitle {
  padding: 10px;
  text-align: center;
  font-size: 24px;
}

.page .editor {
  position: relative;
  margin-top: 32px;
}

.editor-container {
  padding: 0 90px;
  min-height: 400px;
}

.page-show .content {
  width: 660px;
  margin: 0 auto;
  border-style: solid;
  border-width: 1px;
  border-color: white;
}
</style>