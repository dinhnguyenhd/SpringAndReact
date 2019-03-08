package dinhnguyen.demo.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dinhnguyen.demo.entity.Bill;
import dinhnguyen.demo.entity.Items;
import dinhnguyen.demo.repository.BillRepository;

@Service
@Transactional
public class BillServiceImpl implements BillServices {

	@Autowired
	private BillRepository billRepository;

	@Override
	public List<Bill> list() {
		return this.billRepository.findAll();
	}

	@Override
	public Bill add(Bill bill) {
		Bill newBill = new Bill();
		if (bill != null) {
			if (bill.getItems() != null) {
				for (Items item : bill.getItems()) {
					item.setBill(bill);
				}
			}
			if (bill.getConsumer() != null) {
				ArrayList<Bill> list = new ArrayList<Bill>();
				list.add(bill);
				bill.getConsumer().setBills(list);
			}
		}
		newBill = this.billRepository.save(bill);
		return newBill;
	}

	@Override
	public Bill get(Long id) {
		return this.billRepository.getOne(id);
	}

	@Override
	public Bill update(Bill bill) {
		return this.billRepository.save(bill);
	}

	@Override
	public void delete(Long id) {
		this.billRepository.deleteById(id);
	}

	@Override
	public Bill seachBillWittName(String name) {
		return this.billRepository.seachBillWittName(name);
	}

	/**
	 * @return the billRepository
	 */
	public BillRepository getBillRepository() {
		return billRepository;
	}

	/**
	 * @param billRepository the billRepository to set
	 */
	public void setBillRepository(BillRepository billRepository) {
		this.billRepository = billRepository;
	}

}
