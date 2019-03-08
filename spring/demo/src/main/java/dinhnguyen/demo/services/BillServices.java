package dinhnguyen.demo.services;

import java.util.List;

import dinhnguyen.demo.entity.Bill;

public interface BillServices {

	public List<Bill> list();

	public Bill add(Bill bill);

	public Bill get(Long id);

	public Bill update(Bill bill);

	public void delete(Long id);
	
	Bill seachBillWittName(String name);

}
