<template>
  <div class="p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {{ $t('system.logs.title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        {{ $t('system.logs.description') }}
      </p>

      <!-- Simple table placeholder -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th class="px-6 py-3">{{ $t('system.logs.table.time') }}</th>
              <th class="px-6 py-3">{{ $t('system.logs.table.user') }}</th>
              <th class="px-6 py-3">{{ $t('system.logs.table.action') }}</th>
              <th class="px-6 py-3">{{ $t('system.logs.table.ip') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">2026-01-06 18:00:00</td>
              <td class="px-6 py-4">admin</td>
              <td class="px-6 py-4">{{ $t('system.logs.mock.loginSuccess') }}</td>
              <td class="px-6 py-4">192.168.1.1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewLogManagement',
  data() {
    return {}
  },
}
</script>
