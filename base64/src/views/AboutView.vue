<template>
  <!-- Plugin -->
  <link
    rel="stylesheet"
    href="https://rawgit.com/enyo/dropzone/master/dist/dropzone.css"
  />
  <form action="/">
    <div>
      <div class="container mt-10">
        <div class="card bg-white">
          <img :src="image" alt="card_image" />
          <input
            @change="handleImage"
            class="custom-input"
            type="file"
            accept="image/*"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AboutView',
  data () {
    return {
      image: '',
      remoteUrl: ''
    }
  },
  methods: {
    handleImage (e) {
      const selectedImage = e.target.files[0] // get first file
      this.createBase64Image(selectedImage)
    },
    createBase64Image (fileObject) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.image = e.target.result
        this.uploadImage()
        console.log(this.image)
      }
      reader.readAsDataURL(fileObject)
    },
    uploadImage () {
      const { image } = this
      axios
        .post('http://127.0.0.1:8081/upload', { image })
        .then((response) => {
          this.remoteUrl = response.data.url
        })
        .catch((err) => {
          return new Error(err.message)
        })
    }
  }
}
</script>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
}
body {
  background: #d8dddb;
}
.container {
  display: flex;
  justify-content: center;
}
.mt-10 {
  margin-top: 10rem;
}
.bg-white {
  background: #fff;
}
.card {
  height: 25rem;
  width: 50rem;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}
img {
  width: 17rem;
}
</style>
