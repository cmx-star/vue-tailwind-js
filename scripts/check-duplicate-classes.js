#!/usr/bin/env node

/**
 * 全局类内容重复检测脚本
 * 用途: 检测 src/styles/utilities/ 目录下是否有重复的 CSS 内容
 * 使用: pnpm run check:classes
 */

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置
const UTILITIES_DIR = path.join(process.cwd(), 'src/styles/utilities')
const EXCLUDE_FILES = ['index.css']

// 忽略的类名模式 (这些类允许有重复内容)
const IGNORE_PATTERNS = [
  /^fade-/, // Vue 过渡动画
  /^slide-/, // Vue 过渡动画
  /-enter-active$/, // Vue 过渡钩子
  /-leave-active$/, // Vue 过渡钩子
  /-enter-from$/, // Vue 过渡钩子
  /-leave-to$/, // Vue 过渡钩子
]

// ANSI 颜色
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
}

/**
 * 检查类名是否应该被忽略
 */
function shouldIgnore(className) {
  return IGNORE_PATTERNS.some((pattern) => pattern.test(className))
}

/**
 * 递归获取目录下所有 CSS 文件
 */
function getAllCssFiles(dir) {
  const files = []

  if (!fs.existsSync(dir)) {
    return files
  }

  const items = fs.readdirSync(dir)

  items.forEach((item) => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getAllCssFiles(fullPath))
    } else if (item.endsWith('.css') && !EXCLUDE_FILES.includes(item)) {
      files.push(fullPath)
    }
  })

  return files
}

/**
 * 提取类的完整定义 (包括内容)
 */
function extractClassDefinitions(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const classes = []

  // 匹配完整的类定义: .class-name { ... }
  // 支持嵌套和多行
  const regex = /\.([a-z][a-z0-9-]*)\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/gi
  let match

  while ((match = regex.exec(content)) !== null) {
    const className = match[1]
    let cssContent = match[2].trim()

    // 标准化 CSS 内容 (移除空格、换行,统一格式)
    cssContent = cssContent
      .replace(/\s+/g, ' ') // 多个空格变一个
      .replace(/\s*([{}:;,])\s*/g, '$1') // 移除符号周围空格
      .replace(/;}/g, '}') // 移除最后的分号
      .trim()

    // 计算内容哈希
    const contentHash = crypto.createHash('md5').update(cssContent).digest('hex')

    const lineNumber = content.substring(0, match.index).split('\n').length

    classes.push({
      name: className,
      content: cssContent,
      contentHash: contentHash,
      file: path.relative(process.cwd(), filePath),
      line: lineNumber,
      ignored: shouldIgnore(className),
    })
  }

  return classes
}

/**
 * 检查重复内容
 */
function checkDuplicates() {
  console.log(`${colors.cyan}🔍 检查全局类内容重复...${colors.reset}\n`)

  // 获取所有 CSS 文件
  const files = getAllCssFiles(UTILITIES_DIR)

  if (files.length === 0) {
    console.log(`${colors.yellow}⚠️  未找到任何 CSS 文件 (目录: ${UTILITIES_DIR})${colors.reset}`)
    process.exit(0)
  }

  console.log(`${colors.blue}📁 扫描文件: ${files.length} 个${colors.reset}`)
  files.forEach((f) => console.log(`  - ${path.relative(process.cwd(), f)}`))
  console.log('')

  // 提取所有类定义
  const allClasses = []
  files.forEach((file) => {
    const classes = extractClassDefinitions(file)
    allClasses.push(...classes)
  })

  const totalClasses = allClasses.length
  const ignoredClasses = allClasses.filter((c) => c.ignored).length

  console.log(`${colors.blue}📊 发现类定义: ${totalClasses} 个${colors.reset}`)
  if (ignoredClasses > 0) {
    console.log(`${colors.gray}   (忽略 ${ignoredClasses} 个 Vue 过渡类)${colors.reset}`)
  }
  console.log('')

  // 按内容哈希分组 (排除忽略的类)
  const contentMap = new Map()
  allClasses
    .filter((c) => !c.ignored)
    .forEach((cls) => {
      if (!contentMap.has(cls.contentHash)) {
        contentMap.set(cls.contentHash, [])
      }
      contentMap.get(cls.contentHash).push(cls)
    })

  // 找出内容重复的类
  const duplicates = []
  contentMap.forEach((classes, hash) => {
    if (classes.length > 1) {
      duplicates.push({ hash, classes })
    }
  })

  // 输出结果
  if (duplicates.length === 0) {
    console.log(`${colors.green}✅ 未发现重复的 CSS 内容!${colors.reset}`)
    console.log(`${colors.green}   所有全局类样式唯一,可以安全提交。${colors.reset}\n`)
    process.exit(0)
  } else {
    console.log(`${colors.red}❌ 发现 ${duplicates.length} 组重复的 CSS 内容:\n${colors.reset}`)

    duplicates.forEach(({ classes }, index) => {
      console.log(`${colors.yellow}【重复组 ${index + 1}】${colors.reset}`)
      console.log(`${colors.cyan}CSS 内容:${colors.reset}`)
      console.log(
        `  ${classes[0].content.substring(0, 80)}${classes[0].content.length > 80 ? '...' : ''}`,
      )
      console.log(`${colors.yellow}重复的类:${colors.reset}`)
      classes.forEach((cls) => {
        console.log(`  ${colors.cyan}→${colors.reset} .${cls.name} (${cls.file}:${cls.line})`)
      })
      console.log('')
    })

    console.log(`${colors.red}⚠️  建议: 合并这些重复的类,或使用 @apply 复用样式${colors.reset}`)
    console.log(
      `${colors.yellow}提示: 如果这些类确实需要独立存在,请在脚本中添加到忽略列表${colors.reset}\n`,
    )
    process.exit(1)
  }
}

// 执行检查
try {
  checkDuplicates()
} catch (error) {
  console.error(`${colors.red}❌ 检查失败:${colors.reset}`, error.message)
  console.error(error.stack)
  process.exit(1)
}
