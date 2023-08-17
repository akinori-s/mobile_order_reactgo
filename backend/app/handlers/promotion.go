package handlers

import (
	"net/http"
	"mobile_order/app/repositories"
	"github.com/gin-gonic/gin"
)

type PromotionHandler struct {
	PromotionRepository repositories.PromotionRepository
}

func NewPromotionHandler(PromotionRepository repositories.PromotionRepository) *PromotionHandler {
	return &PromotionHandler{
		PromotionRepository: PromotionRepository,
	}
}

func (h *PromotionHandler) GetPromotions(c *gin.Context) {
	promotions, err := h.PromotionRepository.GetPromotions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, promotions)
}
