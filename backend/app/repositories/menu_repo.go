package repositories

import (
	"mobile_order/app/models"
	"database/sql"
)

type MenuRepository struct {
	DB *sql.DB
}

func NewMenuRepository(db *sql.DB) *MenuRepository {
	return &MenuRepository{
		DB: db,
	}
}

func (r *MenuRepository) GetMenus() ([]models.Menu, error) {
	query := "SELECT ID, NAME, CATEGORY_ID, PRICE, IMG_PATH FROM MENU"
	rows, err := r.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var menus []models.Menu
	for rows.Next() {
		var menu models.Menu
		err := rows.Scan(&menu.ID, &menu.Name, &menu.Category_id, &menu.Price, &menu.Image_path)
		if err != nil {
			return nil, err
		}
		menus = append(menus, menu)
	}
	return menus, nil
}

func (r *MenuRepository) GetMenuCategories() ([]models.MenuCategory, error) {
	query := "SELECT ID, NAME FROM MENU_CATEGORY"
	rows, err := r.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var menu_categories []models.MenuCategory
	for rows.Next() {
		var menu_category models.MenuCategory
		err := rows.Scan(&menu_category.ID, &menu_category.Name)
		if err != nil {
			return nil, err
		}
		menu_categories = append(menu_categories, menu_category)
	}
	return menu_categories, nil
}
