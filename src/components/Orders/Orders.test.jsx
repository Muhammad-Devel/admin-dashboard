import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn()
    }
}))

import Orders from './Orders'

describe('Orders', () => {
    it('renders mock orders with pending actions visible', () => {
        render(<Orders />)

        expect(screen.getByText('Orders Management')).toBeInTheDocument()
        expect(screen.getAllByText('Pending').length).toBeGreaterThanOrEqual(1)
        expect(screen.getByText(/Ergo Chair/i)).toBeInTheDocument()
        expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(2)
    })
})
