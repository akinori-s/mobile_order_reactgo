package models

type Transaction struct {
	ID			int				`json:"id"`
	User_id		int				`json:"user_id"`
	Status_id	int				`json:"status_id"`
	Status		string			`json:"status", omitempty`
	Total_price	float32			`json:"total_price"`
	Datetime	string			`json:"datetime"`
	Items		[]OrderDetail	`json:"items", omitempty`
}
