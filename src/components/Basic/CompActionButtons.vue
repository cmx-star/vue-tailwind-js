<template>
  <div class="flex justify-center gap-4">
    <CompBaseButton
      variant="primary"
      :loading="primaryLoading"
      :disabled="primaryDisabled"
      :type="primaryType"
      @click="$emit('primary')"
    >
      {{ displayPrimaryText }}
    </CompBaseButton>
    <CompBaseButton v-if="showSecondary" variant="secondary" @click="$emit('secondary')">
      {{ displaySecondaryText }}
    </CompBaseButton>
  </div>
</template>

<script>
export default {
  name: 'CompActionButtons',
  props: {
    primaryText: {
      type: String,
      default: '',
    },
    secondaryText: {
      type: String,
      default: '',
    },
    showSecondary: {
      type: Boolean,
      default: true,
    },
    primaryLoading: {
      type: Boolean,
      default: false,
    },
    primaryDisabled: {
      type: Boolean,
      default: false,
    },
    primaryType: {
      type: String,
      default: 'primary',
    },
  },
  emits: ['primary', 'secondary'],
  computed: {
    displayPrimaryText() {
      return this.primaryText || this.$t('common.apply')
    },
    displaySecondaryText() {
      return this.secondaryText || this.$t('common.reset')
    },
  },
}
</script>
