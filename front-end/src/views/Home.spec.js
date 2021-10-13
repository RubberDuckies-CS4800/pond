import {render} from '@testing-library/vue'
import Home from './Home.vue'

describe('the home page', () => {
  it('renders a submit button', async () => {
    const {getByText} = render(Home)

    getByText('Submit')

  })
})
