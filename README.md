# Scarlet Sounds
Scarlet Sounds是一个在线Project同人音乐播放平台, 基于[mimi-radio](https://github.com/solstice23/mimi-radio)开发  
这个项目的名字来源于[パチュリーズ・ベストヒットGSK](https://en.touhouwiki.net/wiki/Lyrics:_%E3%83%91%E3%83%81%E3%83%A5%E3%83%AA%E3%83%BC%E3%82%BA%E3%83%BB%E3%83%99%E3%82%B9%E3%83%88%E3%83%92%E3%83%83%E3%83%88GSK)中的幻想乡电台名

## 关于无法播放问题
默认视频源为YouTube, 请在选项中开启**Mirror Mode**以使用镜像源

## 为Scarlet Sounds添加新曲
对于添加新曲十分简单, 首先您需要满足以下条件
1. 为东方Project同人音乐
2. 在YouTube上有官方MV
3. 上传的专辑图片高清无水印
4. 正确且完整添加歌曲信息
5. 使用个人账户进行PR

### 字段说明  
歌曲信息位于`src/data/songs.json`中, 每个歌曲信息为一个json对象, 包含以下字段 

| 字段名              | 类型                  | 是否必须 | 示例值                                      | 说明                  |
|------------------|---------------------|---|------------------------------------------|---------------------|
| `name`           | `string`            | 是 | `"東方言えるかな"`                              | 歌曲原名                |
| `circle`         | `string`            | 是 | `"森羅万象"`                                 | 社团名    |
| `singer`         | `string`            | 是 | `"あやぽんず＊,あよ,すばる"`                        | 演唱者，多个用英文逗号`,`分隔    |
| `translatedName` | `string`或`null`     | 否 | `"东方能说出来吗"` 或 `null`                     | 中文或其他语言的翻译名         |
| `length`         | `string`            | 是 | `"7:10"`                                 | 歌曲时长                |
| `hasLyrics`      | `"Yes"` 或 `"No"`    | 是 | `"Yes"`                                  | 是否附带歌词              |
| `album`          | `string`或`null`     | 否 | `"東方クロニクル"` 或 `null`                     | 所属专辑名               |
| `releaseDate`    | `string` (ISO 8601) | 是 | `"2024-10-20T00:00:00.000Z"`             | 发行日期（UTC ISO格式）     |
| `link`           | `string`            | 是 | `"https://www.youtube.com/watch?v=Baka"` | YouTube官方MV链接       |
| `desc`           | `string`或`null`     | 否 | `"我是描述字段"` 或 `null`                      | 可选的补充说明             |
| `staff`          | `string`            | 是 | `"Lyrics A\nIllustration B\nMix C"`      | 作曲人员信息，使用 `\n` 换行表示角色划分 |
| `cover`          | `string`            | 是 | `"东方言えるかな.webp"`                         | 封面图片文件名，请放在 `/src/data/covers` 目录下 |
| `lyrics`         | `string`或`null`     | 否 | `"東方言えるかな.json"` 或 `null`                | 歌词文件名（JSON 格式）      |
| `lyricsLangs`    | `string[]`          | 否 | `["ja", "cn"]`                           | 若歌词文件为多语言, 则需要填写    |

若歌曲社团名在`/src/data/circles.json`中不存在, 请先添加

### 歌词说明
歌词文件位于`src/data/lyrics`目录下, 每个歌词文件为一个json对象, 包含以下字段  

| 字段名 | 类型 | 是否必须 | 示例值                       | 说明         |
|----|------|---------|---------------------------|------------|
| time | `number` | 是 | `1900`                    | 歌词出现时间（毫秒） |
| text | `string` | 是 | `"は一い！みんな一東方言えるかなの時間だよ一！"` | 歌词文本       |
| cn | `string` | 否 | `"嗨各位！到了“能说得出东方来吗”时间了呦！"` | 中文翻译       |
| ro | `string` | 否 | `"a i u e o"`                | 日文罗马音      |
| interlude | `boolean` | 否 | `true`                    | 是否为间奏      |

**注意:** 歌词文件名必须与歌曲信息中填写一致

### 镜像文件说明
YouTube视频镜像文件位于[**scarlet-sounds-files**](https://github.com/BakaTechie/scarlet-sounds-files)仓库中, 请将YouTube下载的视频重命名为`youtubeid.webp`格式(如示例值为`Baka`), 并上传至根目录下  
**注意:** 推荐视频格式为720p30, 大小受限制于100兆字节以内