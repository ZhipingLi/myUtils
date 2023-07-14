import requestInstance from "..";

interface IHighScoreData {
  list: any[],
  subtitle: string,
  title: string
  type: string,
  _id: string
}

requestInstance.request<IHighScoreData>({
  url: "/home/highscore",
  interceptors: {
    requestInterceptor: (config) => {
      console.log("/home/highscore请求成功的拦截")
      return config
    },
    responseInterceptor: (res) => {
      console.log("/home/highscore响应成功的拦截")
      return res
    }
  }
}).then(res => {
  console.log(res.list, res.subtitle, res.title)
})

