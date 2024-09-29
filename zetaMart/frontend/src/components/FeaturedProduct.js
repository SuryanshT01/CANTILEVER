// src/components/FeaturedProduct.js
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { formatPrice } from '../utils/formatCurrency'

const FeaturedProduct = ({ product }) => {
  return (
    <Card className="text-center bg-light border-0 h-100">
      <Card.Header as="h5" className="bg-primary text-white">Featured Product</Card.Header>
      <Card.Img variant="top" src={product.image} className="mx-auto d-block" style={{width: '200px', height: '200px', objectFit: 'cover'}} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description.substring(0, 100)}...</Card.Text>
        <Card.Text as="h4" className="mb-3">{formatPrice(product.price)}</Card.Text>
        <Link to={`/product/${product._id}`}>
          <Button variant="outline-primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default FeaturedProduct