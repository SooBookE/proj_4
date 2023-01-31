<template>
  <h1>합치기</h1>
  <div class="main">
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <label for="fileInput" class="file-label">
        <div v-if="isDragging">Release to drop files here.</div>
        <div v-else>Drop files here or <u>click here</u> to upload.</div>
      </label>

      <div class="preview-container mt-4" v-if="files.length">
        <div v-for="file in files" :key="file.name" class="preview-card">
          <div>
            <p>
              <!-- {{ file.name }} -->
            </p>
          </div>
          <div>
            <img class="preview-img" :src="generateURL(file)" />
            <p>
              {{ file.name }}
            </p>
            <button
              class="ml-2"
              type="button"
              @click="remove(files.indexOf(file))"
              title="Remove file"
            >
              <b class="de1">×</b><br />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="img_b">
      <div id="app">
        <input type="file" id="file" @change="file_change" />
        <button id="button1" @click="button1_click">predict</button>
        <p id="pred">predict</p>
        <img src="../assets/logo.png" id="img" />
      </div>
      <span></span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      isDragging: false,
      files: [],
    };
  },
  methods: {
    button1_click() {
      const img = document.getElementById("img");
      const span = document.querySelector("span");
      console.log(img);
      // Make a prediction with a selected image
      mobilenet.load().then((model) => {
        // Classify the image.
        model.classify(img).then((predictions) => {
          console.log(predictions);
          // dis.style.display = 'none'
          span.innerHTML =
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
    },
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
  text-align: center;
}

.dropzone-container {
  margin-bottom: 700px;
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
}

.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
