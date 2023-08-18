package handlers

import (
	// "fmt"
	"net/http"
	"mobile_order/app/models"
	"mobile_order/app/repositories"
	"github.com/gin-gonic/gin"
)

type CheckoutHandler struct {
	CheckoutRepository repositories.CheckoutRepository
}

func NewCheckoutHandler(checkoutRepository repositories.CheckoutRepository) *CheckoutHandler {
	return &CheckoutHandler{
		CheckoutRepository: checkoutRepository,
	}
}

func (h *CheckoutHandler) Checkout(c *gin.Context) {
	/* 
	handle new checkout
	- get order(item_ids, and quantities) data from request
	- calculate total price
	- insert order data to transaction table
	- get order id from transaction table
	- insert order detail data to order_detail table
	- make payment request
	- if payment success, update transaction table
	- return transaction id and payment status
	*/
	var order_details []models.OrderDetail
	if err := c.BindJSON(&order_details); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id_price_map, err := h.CheckoutRepository.GetIdPriceMapByOrderList(order_details)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var total_price float32
	for _, order_detail := range order_details {
		if _, ok := id_price_map[order_detail.Item_id]; !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid item id"})
			return
		}
		total_price += id_price_map[order_detail.Item_id] * float32(order_detail.Quantity) // wip: check float32 math with prices
	}

	transaction := models.Transaction{
		User_id: 1, // wip: get user id from token
		Total_price: total_price,
		Status_id: 1, // wip: need to add more status options like pending payment etc.
	}
	err = h.CheckoutRepository.InsertTransaction(&transaction)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// wip: insert order detail data to order_detail table
	for _, order_detail := range order_details {
		order_detail.Transaction_id = transaction.ID
		order_detail.Subtotal = order_detail.Price * float32(order_detail.Quantity)
		err = h.CheckoutRepository.InsertOrderDetail(&order_detail)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	// wip: make payment request

	// wip: if payment success, update transaction table

	c.JSON(http.StatusOK, gin.H{"message": "checkout success"})
}
