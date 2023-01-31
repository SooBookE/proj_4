<template>
  <div class="mobilenet">
    <input type="file" id="file" @change="file_change" />
    <button id="button1" ref="click_btn" @click="button1_click">predict</button>
    <p ref="ref_p" id="pred">predict</p>
    <img src="" id="img" height="500px" />
  </div>
</template>

<script>
import ml5 from 'https://unpkg.com/ml5@latest/dist/ml5.min.js'

export default {
  name: 'app',
  data () {
    return {
      img: '',
      classifier: null
    }
  },
  created () {
    // 버튼 액션안으로 들어갈 경우 매번 모델을 로드하여 속도가 느려진다.
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded)
    this.classifier = classifier
    // When the model is loaded
    function modelLoaded () {
      console.log('Model Loaded!')
    }
  },
  methods: {
    async button1_click () {
      //   const img = document.getElementById('img') // eslint-disable-line no-unused-vars
      const img = this.$refs.click_btn.id

      // Make a prediction with a selected image
      this.classifier.classify(
        $('#button1'),
        // document.getElementById('img'),
        (err, results, body) => {
          if (err) {
            console.log(err.stack)
          }
          const tag = $('#pred')
          console.log(results)
          tag.textContent = results[0].label
        }
      )
    },
    file_change (event) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      fileReader.onload = function (e) {
        document.getElementById('img').src = e.target.result
      }
    }
  }
}
</script>

<style></style>
