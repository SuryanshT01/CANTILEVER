import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Search } from 'lucide-react'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className="d-flex align-items-center">
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <Button 
        type='submit' 
        variant='outline-success' 
        className='d-flex align-items-center'
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: '38px',  // Match the height of the Form.Control
        }}
      >
        <Search size={20} className="mr-1" />
        <span>Search</span>
      </Button>
    </Form>
  )
}

export default SearchBox