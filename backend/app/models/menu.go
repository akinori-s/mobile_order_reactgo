package models

type Menu struct {
	ID			int		`json:"id"`
	Name		string	`json:"name"`
	Category_id	int		`json:"category_id"`
	Price		float32	`json:"price"`
	Image_path	string	`json:"img_path"`
}
