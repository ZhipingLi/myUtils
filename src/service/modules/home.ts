import requestInstance from "..";

interface IHomeData {
  data: any,
  returnCode: string,
  success: boolean
}

requestInstance.request<IHomeData>({
  url: "/home/multidata"
}).then(res => {
  console.log(res.data, res.success, res.returnCode)
})
