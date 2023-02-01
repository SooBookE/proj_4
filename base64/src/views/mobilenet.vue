<template>
  <article>
    <div id="app">
      <input type="file" id="file" @change="file_change" />
      <button id="button1" @click="button1_click">전송</button>
      <p id="pred"></p>
      <img src="" id="img" height="200" width="200" />
    </div>
    <span></span>
  </article>
</template>

<script>
/* eslint-disable */

export default {
  name: "app",
  data() {
    return {
      // classifier: null
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
    file_change(event) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = function (e) {
        document.getElementById("img").src = e.target.result;
      };
    },
  },
};
</script>

<style></style>
