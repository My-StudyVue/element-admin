<template>
  <el-form
    @submit.native.prevent="saveArticle"
    ref="form"
    :model="article"
    label-width="80px"
  >
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.container"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CreateArticle',
  data () {
    return {
      article: {}
    }
  },
  methods: {
    saveArticle () {
      this.$http.post('articles', this.article).then(() => {
        this.$message({
          message: '文章创建成功',
          type: 'success'
        });
        // history.go(-1) // 不能确保上一个页面就是文章列表页
        this.$router.push('/articles/index')
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
