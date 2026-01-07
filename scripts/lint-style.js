#!/usr/bin/env node

/**
 * 代码质量检查脚本
 * 用途: 自动检查代码是否符合开发规范
 * 使用: pnpm run lint:style
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置
const SRC_DIR = path.join(process.cwd(), 'src')
const EXCLUDE_DIRS = ['node_modules', 'dist', '.git']

// ANSI 颜色
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

// 检查结果
const issues = {
  hardcodedColors: [],
  nonStandardSpacing: [],
  tooManyClasses: [],
  noSemanticVars: [],
  notMobileFirst: [],
  noDarkMode: [],
  unnecessaryApply: [],
  noComments: [],
}

/**
 * 递归获取所有 Vue 文件
 */
function getAllVueFiles(dir) {
  const files = []

  if (!fs.existsSync(dir)) return files

  const items = fs.readdirSync(dir)

  items.forEach((item) => {
    if (EXCLUDE_DIRS.includes(item)) return

    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getAllVueFiles(fullPath))
    } else if (item.endsWith('.vue')) {
      files.push(fullPath)
    }
  })

  return files
}

/**
 * 检查1: 硬编码颜色
 */
function checkHardcodedColors(content, file) {
  const patterns = [
    /class="[^"]*\b(bg|text|border)-\[#[0-9a-fA-F]{3,6}\]/g,
    /style="[^"]*(?:background|color|border)[^:]*:\s*#[0-9a-fA-F]{3,6}/g,
  ]

  patterns.forEach((pattern) => {
    const matches = content.matchAll(pattern)
    for (const match of matches) {
      const line = content.substring(0, match.index).split('\n').length
      issues.hardcodedColors.push({
        file: path.relative(process.cwd(), file),
        line,
        code: match[0].substring(0, 60),
      })
    }
  })
}

/**
 * 检查2: 非标准间距
 */
function checkNonStandardSpacing(content, file) {
  const pattern = /class="[^"]*\b[pm][tblrxy]?-\[(\d+)px\]/g
  const matches = content.matchAll(pattern)

  for (const match of matches) {
    const line = content.substring(0, match.index).split('\n').length
    issues.nonStandardSpacing.push({
      file: path.relative(process.cwd(), file),
      line,
      code: match[0].substring(0, 60),
    })
  }
}

/**
 * 检查3: 类名过多
 */
function checkTooManyClasses(content, file) {
  const pattern = /class="([^"]*)"/g
  const matches = content.matchAll(pattern)

  for (const match of matches) {
    const classes = match[1].trim().split(/\s+/)
    if (classes.length > 8) {
      const line = content.substring(0, match.index).split('\n').length
      issues.tooManyClasses.push({
        file: path.relative(process.cwd(), file),
        line,
        count: classes.length,
        code: match[0].substring(0, 80),
      })
    }
  }
}

/**
 * 检查4: 未使用语义化变量
 */
function checkSemanticVars(content, file) {
  const pattern = /<style[^>]*>([\s\S]*?)<\/style>/g
  const matches = content.matchAll(pattern)

  for (const match of matches) {
    const styleContent = match[1]
    // 检查是否有硬编码的颜色值
    const colorPattern = /(?:background-color|color|border-color)\s*:\s*#[0-9a-fA-F]{3,6}/g
    const colorMatches = styleContent.matchAll(colorPattern)

    for (const colorMatch of colorMatches) {
      const line = content
        .substring(0, match.index + styleContent.indexOf(colorMatch[0]))
        .split('\n').length
      issues.noSemanticVars.push({
        file: path.relative(process.cwd(), file),
        line,
        code: colorMatch[0],
      })
    }
  }
}

/**
 * 检查5: 响应式是否 Mobile First
 */
function checkMobileFirst(content, file) {
  // 检查是否有 md: 或 lg: 在基础类之前
  const pattern = /class="[^"]*\b(md|lg|xl):[^\s"]+(?!\s+[^:md|lg|xl])/g
  const matches = content.matchAll(pattern)

  for (const match of matches) {
    const classAttr = match[0]
    // 简单检查: 如果只有响应式类没有基础类,可能不是 Mobile First
    if (
      !classAttr.includes('flex') &&
      !classAttr.includes('grid') &&
      !classAttr.includes('block')
    ) {
      const line = content.substring(0, match.index).split('\n').length
      issues.notMobileFirst.push({
        file: path.relative(process.cwd(), file),
        line,
        code: match[0].substring(0, 60),
      })
    }
  }
}

/**
 * 检查6: 暗黑模式适配
 */
function checkDarkMode(content, file) {
  // 检查是否有 bg-white 或 text-black 但没有 dark: 前缀
  const pattern = /class="[^"]*\b(bg-white|text-black|bg-gray-50)(?!\s+dark:)/g
  const matches = content.matchAll(pattern)

  for (const match of matches) {
    const line = content.substring(0, match.index).split('\n').length
    issues.noDarkMode.push({
      file: path.relative(process.cwd(), file),
      line,
      code: match[0].substring(0, 60),
    })
  }
}

/**
 * 检查7: 不必要的 @apply
 */
function checkUnnecessaryApply(content, file) {
  const pattern = /<style[^>]*scoped[^>]*>([\s\S]*?)<\/style>/g
  const matches = content.matchAll(pattern)

  for (const match of matches) {
    const styleContent = match[1]
    const applyPattern = /@apply\s+([^;]+);/g
    const applyMatches = styleContent.matchAll(applyPattern)

    for (const applyMatch of applyMatches) {
      const classes = applyMatch[1].trim().split(/\s+/)
      // 如果只有1-2个类,可能不需要 @apply
      if (classes.length <= 2) {
        const line = content
          .substring(0, match.index + styleContent.indexOf(applyMatch[0]))
          .split('\n').length
        issues.unnecessaryApply.push({
          file: path.relative(process.cwd(), file),
          line,
          code: applyMatch[0],
        })
      }
    }
  }
}

/**
 * 主检查函数
 */
function checkFiles() {
  console.log(`${colors.cyan}🔍 开始代码质量检查...${colors.reset}\n`)

  const files = getAllVueFiles(SRC_DIR)
  console.log(`${colors.blue}📁 扫描文件: ${files.length} 个 Vue 文件${colors.reset}\n`)

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8')

    checkHardcodedColors(content, file)
    checkNonStandardSpacing(content, file)
    checkTooManyClasses(content, file)
    checkSemanticVars(content, file)
    checkMobileFirst(content, file)
    checkDarkMode(content, file)
    checkUnnecessaryApply(content, file)
  })

  // 输出结果
  let totalIssues = 0

  if (issues.hardcodedColors.length > 0) {
    totalIssues += issues.hardcodedColors.length
    console.log(`${colors.red}❌ 硬编码颜色 (${issues.hardcodedColors.length} 处)${colors.reset}`)
    issues.hardcodedColors.slice(0, 5).forEach((issue) => {
      console.log(`  ${colors.cyan}→${colors.reset} ${issue.file}:${issue.line}`)
      console.log(`    ${colors.yellow}${issue.code}${colors.reset}`)
    })
    if (issues.hardcodedColors.length > 5) {
      console.log(`  ${colors.gray}... 还有 ${issues.hardcodedColors.length - 5} 处${colors.reset}`)
    }
    console.log('')
  }

  if (issues.nonStandardSpacing.length > 0) {
    totalIssues += issues.nonStandardSpacing.length
    console.log(
      `${colors.red}❌ 非标准间距 (${issues.nonStandardSpacing.length} 处)${colors.reset}`,
    )
    issues.nonStandardSpacing.slice(0, 5).forEach((issue) => {
      console.log(`  ${colors.cyan}→${colors.reset} ${issue.file}:${issue.line}`)
    })
    if (issues.nonStandardSpacing.length > 5) {
      console.log(
        `  ${colors.gray}... 还有 ${issues.nonStandardSpacing.length - 5} 处${colors.reset}`,
      )
    }
    console.log('')
  }

  if (issues.tooManyClasses.length > 0) {
    totalIssues += issues.tooManyClasses.length
    console.log(`${colors.yellow}⚠️  类名过多 (${issues.tooManyClasses.length} 处)${colors.reset}`)
    issues.tooManyClasses.slice(0, 3).forEach((issue) => {
      console.log(
        `  ${colors.cyan}→${colors.reset} ${issue.file}:${issue.line} (${issue.count} 个类)`,
      )
    })
    if (issues.tooManyClasses.length > 3) {
      console.log(`  ${colors.gray}... 还有 ${issues.tooManyClasses.length - 3} 处${colors.reset}`)
    }
    console.log('')
  }

  if (issues.noSemanticVars.length > 0) {
    totalIssues += issues.noSemanticVars.length
    console.log(
      `${colors.red}❌ 未使用语义化变量 (${issues.noSemanticVars.length} 处)${colors.reset}`,
    )
    issues.noSemanticVars.slice(0, 5).forEach((issue) => {
      console.log(`  ${colors.cyan}→${colors.reset} ${issue.file}:${issue.line}`)
      console.log(`    ${colors.yellow}${issue.code}${colors.reset}`)
    })
    if (issues.noSemanticVars.length > 5) {
      console.log(`  ${colors.gray}... 还有 ${issues.noSemanticVars.length - 5} 处${colors.reset}`)
    }
    console.log('')
  }

  // 总结
  if (totalIssues === 0) {
    console.log(`${colors.green}✅ 代码质量检查通过!${colors.reset}`)
    console.log(`${colors.green}   未发现违反开发规范的代码。${colors.reset}\n`)
    process.exit(0)
  } else {
    console.log(`${colors.red}发现 ${totalIssues} 个问题,请修复后再提交。${colors.reset}\n`)
    console.log(
      `${colors.cyan}💡 提示: 查看 docs/development-standards.md 了解详细规范${colors.reset}\n`,
    )
    process.exit(1)
  }
}

// 执行检查
try {
  checkFiles()
} catch (error) {
  console.error(`${colors.red}❌ 检查失败:${colors.reset}`, error.message)
  process.exit(1)
}
