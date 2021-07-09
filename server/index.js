const express = require('express') // 引用express
const app = express() // 建立express实例




// 可以任意域名进行访问（跨域）
app.use(require('cors')())
// 让 express 识别客户提交过来的json数据
app.use(express.json())




// 定义数据模型
const mongoose = require('mongoose')
/**
 * 只要本机安装了mongodb就行，不一定需要这个数据库存在
 * mongodb 的默认端口号 27017
 */
// 连接数据库
mongoose.connect('mongodb://localhost:27017/element-admin', {
  /**
   * 添加常见的三个参数：useCreateIndex,useFindAndModify,useNewUrlParser
   * 没有这三个参数可能会有白色的警告
   */
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
})




// 定义数据操作的模型
/**
 *  模型名称       模型的结构
 * (name: string, schema?: mongoose.Schema<any, mongoose.Model<any, any, any>, undefined, any>, collection?: string, skipInit?: boolean): mongoose.Model<any, {}, {}>
 */
const Article = mongoose.model('Article', new mongoose.Schema({
  title: { type: String },
  container: { type: String },
}))





// 配置默认首页
app.get('/', async (req, res) => {
  // get 请求方法一般用于展示数据
  res.send('index')
})





// 新增文章
app.post('/api/articles', async (req, res) => {
  // 提交数据用post方法
  // 创建 create
  const article = await Article.create(req.body)
  // 发送给前端
  res.send(article)
})




// 显示文章列表
app.get('/api/articles', async (req, res) => {
  // get 方法展示数据
  // 查询数据 find
  const articles = await Article.find()
  // 发送给前端
  res.send(articles)
})



// 删除文档
app.delete('/api/articles/:id', async (req, res) => {
  // delete 方法删除数据
  // 通过id查找数据并且删除 findByIdAndDelete
  // req.params.id ---> 表示客户端请求的url参数的id
  await Article.findByIdAndDelete(req.params.id)
  // 发送给前端
  res.send({
    status: true
  })
})




// 文档详情
app.get('/api/articles/:id', async (req, res) => {
  // get 方法展示数据
  // 通过id查找数据 findByIdAndDelete 
  const article = await Article.findById(req.params.id)
  // 发送给前端
  res.send(article)
})



// 修改文章
// 可以用post put patch 为了前端方便用post，但是为了rest的一个规范用put/patch
app.put('/api/articles/:id', async (req, res) => {
  // get 方法展示数据
  // 通过id查找数据并且更新 findByIdAndUpdate 
  const article = await Article.findByIdAndUpdate(req.params.id, req.body)
  // 发送给前端
  res.send(article)
})


/**
 * 端口号,主机名，回调函数
 * (port: number, hostname:string,callback?: () => void)
 */
app.listen(3001, () => {
  // 启动之后做什么
  console.log('http://localhost:3001/');
})