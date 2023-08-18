package models

type OrderDetail struct {
	ID				int		`json:"transaction_detail_id", omitempty`
	Item_id			int		`json:"id"`
	Transaction_id	int		`json:"transaction_id"`
	Quantity		int		`json:"quantity"`
	Price			float32	`json:"price"`
	Subtotal		float32	`json:"subtotal"`
	Datetime		string	`json:"datetime"`
}
