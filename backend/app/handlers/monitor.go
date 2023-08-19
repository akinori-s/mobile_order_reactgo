package handlers

import (
	"net/http"
	// "mobile_order/app/models"
	"mobile_order/app/repositories"
	"github.com/gin-gonic/gin"
)

type MonitorHandler struct {
	MonitorRepository repositories.MonitorRepository
}

func NewMonitorHandler(monitorRepository repositories.MonitorRepository) *MonitorHandler {
	return &MonitorHandler{
		MonitorRepository: monitorRepository,
	}
}

func (h *MonitorHandler) GetPendingOrders(c *gin.Context) {
	orders, err := h.MonitorRepository.GetPendingOrders()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, orders)
}

func (h *MonitorHandler) UpdateOrderStatus(c *gin.Context) {
	var orderID int
	if err := c.BindJSON(&orderID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := h.MonitorRepository.UpdateOrderStatus(orderID, "Completed")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Order status updated"})
}
