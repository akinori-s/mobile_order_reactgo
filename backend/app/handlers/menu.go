package handlers

import (
	// "strconv"
	"net/http"
	"mobile_order/app/models"
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

func (h *MenuHandler) AddMenuItem(c *gin.Context) {
	var menu models.Menu
	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.MenuRepository.AddMenuItem(menu); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Menu item added successfully"})
}

func (h *MenuHandler) UpdateMenuItem(c *gin.Context) {
	var menu models.Menu
	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.MenuRepository.UpdateMenuItem(menu); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Menu item updated successfully"})
}

func (h *MenuHandler) DeleteMenuItem(c *gin.Context) {
	menuId := c.Param("menuId")
	if err := h.MenuRepository.DeleteMenuItem(menuId); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Menu item deleted successfully"})
}
