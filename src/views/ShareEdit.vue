<template>
  <Layout>
    <div class="total-page" v-bind:key="refresh">
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
    <el-button class="download-btn" type="primary" @click="convertToPDF">下载</el-button>
    <el-button class="submit-btn" type="primary" @click="submitPDF">提交</el-button>
    <el-button class="create-btn" type="primary" @click="createDoc">创建</el-button>
    <div>
      <el-aside class="side-menu" :width="isCollapse ? '65px' : '200px'">
        <i class="el-icon-search" style="font-size: 25px;cursor: pointer;margin-left: 20px" title="在线搜索"
           @click="switchToSearch"></i>
        <i class="el-icon-document-checked" style="font-size: 25px;cursor: pointer;margin-left: 15px" title="智能纠错"
           @click="switchToCorrect"></i>
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse"
                 background-color="rgb(192,192,192,0.1)" text-color="#EBEEF5" router
                 :collapse-transition="false" style="border: none;margin-top: 10px">
          <div v-if="showSearch">
            <el-input v-model="searchInput" placeholder="请输入关键词" style="margin: 5px"></el-input>
            <el-button icon="el-icon-search" type="primary" @click="search" size="mini" style="width: 90%;">
              在线搜索
            </el-button>
            <br>
            <textarea style="margin: 5px;height: 300px" placeholder="搜索的内容" readonly>{{searchContent}}</textarea>
          </div>
          <div v-if="showCorrect">
            <textarea style="margin: 5px;height: 180px" placeholder="请输入要纠错的内容">{{beforeCorrectContent}}</textarea>
            <el-button type="primary" @click="correct" size="mini" style="width: 50%;">
              点击智能纠错
            </el-button>
            <textarea style="margin: 5px;height: 170px" placeholder="纠错后的内容" readonly>{{afterCorrectContent}}</textarea>
          </div>
        </el-menu>
      </el-aside>
    </div>
    <div>

    </div>
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
import $ from 'jquery'

ShareDB.types.register(richText.type);
import axios from 'axios'

// const axios = require('axios');
const FormData = require('form-data');
const base_url = '10.135.1.65:8080';
// The current user's info, must contain both id and name field.

export default {
  name: "ShareEdit",
  components: {Layout},
  data() {
    return {
      searchInput: '',
      searchContent: '',
      showSearch: true,
      showCorrect: false,
      beforeCorrectContent: '',
      afterCorrectContent: '',
      historyId: this.$route.params.id,
      refresh: 0
    }
  },
  methods: {
    createDoc() {
      location.reload()
    },
    switchToCorrect() {
      this.showCorrect = true
      this.showSearch = false
    },
    switchToSearch() {
      this.showSearch = true
      this.showCorrect = false
    },
    correct() {
      if (!this.beforeCorrectContent) {
        this.$message.error('请先输入要纠错的内容！')
      }
      axios.post('/flask/correct_text', {
        data: this.beforeCorrectContent
      }).then(res => {
        this.afterCorrectContent = res.correct
      }).catch(error => {
        this.$message.error('发生错误，请稍后再试')
      })
    },
    search() {
      if (!this.searchInput) {
        this.$message.error('请先输入关键词！')
      }
      axios.post('/flask/search_info', {
        keyword: this.searchInput
      }).then(res => {
        this.searchContent = res.summary
      }).catch(error => {
        this.$message.error('搜索错误，请稍后再试')
      })
    },
    convertToPDF() {
      html2canvas(document.getElementById('show-content'), {
        backgroundColor: 'white',
        useCORS: true, //支持图片跨域
        allowTaint: true,
        scale: 1, //设置放大的倍数
      }).then((canvas) => {
        let pdf = new jsPDF('p', 'mm', 'a4')
        let imgData = canvas.toDataURL('image/png')
        pdf.addImage(imgData, 'PNG', 0, 0)
        pdf.save('download.pdf')
      })
    },
    submitPDF() {
      html2canvas(document.getElementById('show-content'), {
        backgroundColor: 'white',
        useCORS: true, //支持图片跨域
        allowTaint: true,
        scale: 1, //设置放大的倍数
      }).then((canvas) => {
        let pdf = new jsPDF('p', 'mm', 'a4')
        let imgData = canvas.toDataURL('image/png')
        pdf.addImage(imgData, 'PNG', 0, 0)
        let blob = pdf.output('blob');
        var formData = new FormData();
        formData.append("file", blob, "download.pdf");
        formData.append("historyid",this.historyId);
        formData.append("score",8)
        // 使用fetch API发送到服务器
        fetch("/api/saveReport", {
          method: "POST",
          body: formData
        }).then(response => {
          if (response.ok) {
            this.$message.success('成功提交病例报告！')
          } else {
            this.$message.error('发生错误，请稍后再试')
          }
        });
      });

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
            const url = "/node/upload";
            const formData = new FormData();
            //console.log(dataURI)
            formData.append('image', dataURItoBlob(dataURI), 'image.png');
            let urlInSys = "/node/uploads/";
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
    let websocketEndpoint = "ws://" + base_url;

    editor.syncThroughWebsocket(websocketEndpoint, this.historyId.padStart(8, "0"), this.historyId.padStart(8, "0"));
    // editor.syncThroughWebsocket(websocketEndpoint, "00", "00");
    let socket = new ReconnectingWebSocket(websocketEndpoint);

    let connection = new ShareDB.Connection(socket);

    let doc = connection.get(this.historyId.padStart(8, "0"), this.historyId.padStart(8, "0"));
    // let doc = connection.get("00", "00");

// Create a hidden quill editor to parse delta to html

    console.log(this.historyId)
    let editorContainer = document.createElement('div');
    editorContainer.style.display = 'none';
    let quill = new Quill(editorContainer);
    doc.fetch((err) => {
      if (err) {
        console.log(err);
        return;
      }
      if (doc.type === null) {
        axios.post('/api/file/createQuill', {
          fid: this.historyId
        }).catch(error => {
          this.$message.error('创建文档失败，请稍后再试')
        })
      }
      let delta = doc.data;
      quill.setContents(delta);
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

<style lang="scss" scoped>
.side-menu {
  position: absolute;
  left: 1280px;
  top: 135px;
  width: 200px;
  overflow: auto;
  z-index: 2000;
  border: none;
}

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
  border-color: #868e96!important;
}

.editor-container {
  padding: 0 90px;
  height: 800px;
  overflow-y: scroll;
  overflow-x: hidden;
  border-color: #868e96;
}

.page-show .content {
  margin-top: 10px;
  height: 870px;
  width: 650px;
  border-style: solid;
  border-width: 1px;
  border-color: #868e96;
  overflow-y: scroll;
}

.download-btn {
  position: absolute;
  top: 120px;
  right: 310px;
}

.create-btn {
  position: absolute;
  top: 120px;
  right: 400px;
}
.submit-btn {
  position: absolute;
  top: 120px;
  right: 220px;
}
</style>