<template>
  <h1>1page</h1>
  <div class="main">
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      @change="file_change"
      @click="sendMessage()"
    >
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange()"
        ref="file"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <!-- 드래그 했을때  -->
      <label for="fileInput" class="file-label">
        <div v-if="isDragging">Release to drop files here.</div>
        <div v-else>
          Drop files here or <u>click here</u>
          to upload.
        </div>
      </label>

      <div class="preview-container mt-4" v-if="files.length">
        <div v-for="file in files" :key="file.name" class="preview-card">
          <div class="img_c">
            <img class="preview-img" :src="generateURL(file)" id="img" />
            <span id="name">
              {{ file.name }}
            </span>
            <button @click="button_click">예측</button>
            <button
              class="ml-2"
              type="button"
              @click="remove(files.indexOf(file))"
              title="Remove file"
            >
              <span class="de1">삭제</span>
            </button>
          </div>
        </div>
      </div>
      <span id="pred"></span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "chat",
  // created() {
  //   this.$socket.on('chat', (data) => {
  //     console.log(data)
  //     this.chatData.push(data)
  //   })
  // },
  data() {
    return {
      isDragging: false,
      files: [],
      chatData: [],
    };
  },
  methods: {
    button_click() {
      const img = document.getElementById("img");
      const pred = document.getElementById("pred");
      console.log(img);
      // Make a prediction with a selected image
      mobilenet.load().then((model) => {
        // Classify the image.
        model.classify(img).then((predictions) => {
          console.log(predictions);
          pred.innerHTML =
            predictions[0].className +
            "<br>" +
            (predictions[0].probability * 100).toFixed(2) +
            "%";
        });
      });
    },
    onChange() {
      this.files = [...this.$refs.file.files];
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
      // this.file_chan(e.dataTransfer.files)
      // this.file_chan()
      this.file_change();
    },
    generateURL(file) {
      const fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
    remove(i) {
      this.files.splice(i, 1);
      const de = document.getElementById("pred");

      if (de == true) {
        de.style.display = "block";
      } else {
        de.textContent = "";
      }
    },
    file_change() {
      const input = document.querySelector(".hidden-input");
      let fileReader = new FileReader(); // 비동기적으로 파일의 내용을 읽는다
      fileReader.readAsDataURL(input.files[0]); // readAsDataURL = 바이너리 파일을 Base64 Encode 문자열로 반환
      let span = input.files[0].name;
      console.log(span);
      fileReader.onload = function (e) {
        // onload = 읽기 동작이 성공 했을때 발생
        const img_src = (document.getElementById("img").src = e.target.result);
        console.log(img_src);

        axios({
          url: "http://localhost:3000/",
          method: "post",
          data: {
            key: span,
            text: img_src,
          },
        }).then((res) => {
          alert(res.data.message);
        });
      };
    },
    sendMessage() {},
  },
};
</script>
<style>
.main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  height: 100vh;
  justify-content: center;
  /* text-align: center; */
}

.dropzone-container {
  margin-bottom: 500px;
  padding: 4rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}

.preview-container {
  display: flex;
  margin-top: 2rem;
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
  width: 350px;
}
.preview-img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
.img_c {
  display: flex;
  align-items: center;
  width: 700px;
  justify-content: space-between;
}
</style>
