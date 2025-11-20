import 'jest'
import { mount } from '@vue/test-utils'
import PulseInput from './PulseInput.vue'

describe('PulseInput', () => {
  it('renders label text, hint, and accessibility attributes', () => {
    const wrapper = mount(PulseInput, {
      props: {
        id: 'email',
        label: 'Email',
        hint: 'Use your work email',
        modelValue: '',
      },
    })

    const input = wrapper.get('input')

    expect(wrapper.get('label').text()).toBe('Email')
    expect(wrapper.get('.pulse-hint').text()).toBe('Use your work email')
    expect(input.attributes('aria-describedby')).toBe('email-hint')
    expect(input.attributes('aria-invalid')).toBe('false')
  })

  it('emits updates and focus/blur events', async () => {
    const wrapper = mount(PulseInput, {
      props: {
        type: 'number',
        modelValue: null,
      },
    })

    const input = wrapper.get('input')

    await input.setValue('42')
    await input.trigger('focus')
    await input.trigger('blur')

    expect(wrapper.emitted()['update:modelValue']?.[0]).toEqual([42])
    expect(wrapper.emitted().focus).toHaveLength(1)
    expect(wrapper.emitted().blur).toHaveLength(1)
  })
})
