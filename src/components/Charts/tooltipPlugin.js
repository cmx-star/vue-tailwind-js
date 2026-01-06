/**
 * uPlot Tooltip 插件
 * 为图表提供自定义 tooltip 显示功能，使用 Tailwind CSS
 */
import uPlot from 'uplot'

export function createTooltipPlugin(labels, isDark = false) {
  let tooltip = null
  let over = null

  return {
    hooks: {
      ready: (u) => {
        // 创建 tooltip 元素，使用 Tailwind CSS 类
        tooltip = document.createElement('div')
        tooltip.className = `fixed z-50 pointer-events-none rounded-lg px-3 py-2 text-sm shadow-lg ${
          isDark
            ? 'bg-gray-800 border border-gray-700 text-gray-100'
            : 'bg-white border border-gray-200 text-gray-900'
        }`
        tooltip.style.display = 'none'

        over = u.over

        // 将 tooltip 添加到 body，使用 fixed 定位
        document.body.appendChild(tooltip)

        // 鼠标进入时显示 tooltip
        over.addEventListener('mouseenter', () => {
          if (tooltip) {
            tooltip.style.display = 'block'
          }
        })

        // 鼠标离开时隐藏 tooltip
        over.addEventListener('mouseleave', () => {
          if (tooltip) {
            tooltip.style.display = 'none'
          }
        })
      },
      setCursor: (u) => {
        if (!tooltip) return

        const { left, top, idx } = u.cursor

        if (idx == null || idx < 0) {
          tooltip.style.display = 'none'
          return
        }

        // 构建 tooltip 内容
        let content = ''

        // X 轴标签
        if (labels && labels[idx] !== undefined && labels[idx] !== null && labels[idx] !== '') {
          content += `<div class="font-semibold mb-2 pb-2 border-b ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }">${labels[idx]}</div>`
        }

        // 所有系列的值
        const seriesValues = []
        for (let i = 1; i < u.series.length; i++) {
          const series = u.series[i]
          const value = u.data[i] && u.data[i][idx] !== undefined ? u.data[i][idx] : null

          if (value != null && !isNaN(value) && isFinite(value)) {
            const color = series.stroke || series.fill || (isDark ? '#9ca3af' : '#6b7280')
            const label = series.label || `系列 ${i}`
            const formattedValue =
              typeof series.value === 'function'
                ? series.value(u, value, i, idx)
                : uPlot.fmtNum(value)

            seriesValues.push(
              `<div class="flex items-center mt-1">
                <span class="inline-block w-2.5 h-2.5 rounded mr-2 flex-shrink-0" style="background-color: ${color};"></span>
                <span class="flex-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}">${label}:</span>
                <span class="font-semibold ml-2 ${
                  isDark ? 'text-gray-100' : 'text-gray-900'
                }">${formattedValue}</span>
              </div>`,
            )
          }
        }

        if (seriesValues.length > 0) {
          content += seriesValues.join('')
        }

        if (content) {
          tooltip.innerHTML = content

          // 获取图表容器的位置
          const chartRect = u.over.getBoundingClientRect()

          // 先显示以获取 tooltip 尺寸
          tooltip.style.visibility = 'hidden'
          tooltip.style.display = 'block'
          const tooltipRect = tooltip.getBoundingClientRect()
          tooltip.style.visibility = 'visible'

          // 计算鼠标在图表中的相对位置
          const mouseX = left + chartRect.left
          const mouseY = top + chartRect.top

          // 默认位置：鼠标右下方
          let tooltipLeft = mouseX + 15
          let tooltipTop = mouseY - tooltipRect.height / 2

          // 防止 tooltip 超出右边界
          if (tooltipLeft + tooltipRect.width > window.innerWidth - 10) {
            tooltipLeft = mouseX - tooltipRect.width - 15
          }

          // 防止 tooltip 超出左边界
          if (tooltipLeft < 10) {
            tooltipLeft = 10
          }

          // 防止 tooltip 超出上边界
          if (tooltipTop < 10) {
            tooltipTop = mouseY + 15
          }

          // 防止 tooltip 超出下边界
          if (tooltipTop + tooltipRect.height > window.innerHeight - 10) {
            tooltipTop = mouseY - tooltipRect.height - 15
          }

          tooltip.style.left = `${tooltipLeft}px`
          tooltip.style.top = `${tooltipTop}px`
        } else {
          tooltip.style.display = 'none'
        }
      },
      destroy: (_u) => {
        // 清理 tooltip
        if (tooltip && tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip)
        }
        tooltip = null
      },
    },
  }
}
