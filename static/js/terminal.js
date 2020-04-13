var titleBar = new Vue({
  el: ".title-bar",
  data() {
    return {
      iconShow: true
    }
  }
})

var interface = new Vue({
  el: ".interface",
  data() {
    return {
      items: [{
        "header": "主页",
        "cmd": "ls",
        "guideHidden": false,
        "inputHidden": true,
        "outputHidden": true,
        "result": [],
        "className": 0
      }],
    }
  },
  methods: {

    runCommand(index) {
      console.log(index)
      if (this.items[index].inputHidden === true) {
        this.items[index].inputHidden = false
        var typed = new Typed('.typed', {
          strings: [this.items[index].cmd],
          showCursor: true,
          typeSpeed: 100,
          onComplete: (self) => {
            axios.get('http://127.0.0.1:8000/api/v1/category/', { // 还可以直接把参数拼接在url后边
              params: {
                "format": "json"
              },
              async: false,
            }).then(function (res) {
              interface.showResult(index, res)
            })

            this.items.push({
              "header": "分类",
              "cmd": "ls",
              "guideHidden": false,
              "inputHidden": true,
              "outputHidden": true,
            })
          },
        });

      }

    },
    showResult(index, res) {
      datas = []
      results = res.data.results
      for (i in results) {
        data = {
            "key": results[i].name,
            "value": results[i].name,
            "type": "folder"
          },
          datas.push(data)
      }
      this.items[index].results = datas
      this.items[index].outputHidden = false
    },
  }
})
