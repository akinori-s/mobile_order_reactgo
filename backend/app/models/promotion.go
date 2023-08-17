package models

type Promotion struct {
	ID			int		`json:"id"`
	Title		string	`json:"title"`
	Description	string	`json:"description"`
	Image_path	string	`json:"img_path"`
}
