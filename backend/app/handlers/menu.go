package handlers

import (
	// "strconv"
	"net/http"
	// "mobile_order/app/models"
	"mobile_order/app/repositories"
	"github.com/gin-gonic/gin"
)

type MenuHandler struct {
	MenuRepository repositories.MenuRepository
}

func NewMenuHandler(menuRepository repositories.MenuRepository) *MenuHandler {
	return &MenuHandler{
		MenuRepository: menuRepository,
	}
}

func (h *MenuHandler) GetMenus(c *gin.Context) {
	menus, err := h.MenuRepository.GetMenus()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, menus)
}

func (h *MenuHandler) GetMenuCategories(c *gin.Context) {
	menu_categories, err := h.MenuRepository.GetMenuCategories()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, menu_categories)
}
