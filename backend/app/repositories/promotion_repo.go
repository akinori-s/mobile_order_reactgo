package repositories

import (
	"mobile_order/app/models"
	"database/sql"
)

type PromotionRepository struct {
	DB *sql.DB
}

func NewPromotionRepository(db *sql.DB) *PromotionRepository {
	return &PromotionRepository{
		DB: db,
	}
}

func (r *PromotionRepository) GetPromotions() ([]models.Promotion, error) {
	query := "SELECT ID, NAME, DESCRIPTION, IMG_PATH FROM PROMOTIONS"
	rows, err := r.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var promotions []models.Promotion
	for rows.Next() {
		var promotion models.Promotion
		err := rows.Scan(&promotion.ID, &promotion.Title, &promotion.Description, &promotion.Image_path)
		if err != nil {
			return nil, err
		}
		promotions = append(promotions, promotion)
	}
	return promotions, nil
}
