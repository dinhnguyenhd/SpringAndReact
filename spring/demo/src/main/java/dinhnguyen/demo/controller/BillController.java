package dinhnguyen.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dinhnguyen.demo.entity.Bill;
import dinhnguyen.demo.services.BillServices;

@RestController
@RequestMapping("/bills")
@CrossOrigin
public class BillController {

	@Autowired
	private BillServices billServices;

	@GetMapping(value = "/list")
	public ResponseEntity<List<Bill>> list() {
		List<Bill> list = this.billServices.list();
		return new ResponseEntity<>(list, HttpStatus.OK);

	}

	@PostMapping(value = "/add")
	public ResponseEntity<Bill> addBill(@RequestBody Bill bill) {
		Bill newbill = this.billServices.add(bill);
		return new ResponseEntity<Bill>(newbill, HttpStatus.OK);
	}

	@GetMapping(value = "/getbyId/{id}")
	public ResponseEntity<Bill> getBillById(@PathVariable("id") Long id) {
		Bill newBill = new Bill();
		newBill = this.billServices.get(id);
		return new ResponseEntity<Bill>(newBill, HttpStatus.OK);

	}

	@PutMapping(value = "/update")
	public ResponseEntity<Bill> updateBill(@RequestBody Bill bill) {
		Bill updats = this.billServices.get(bill.getId());
		updats.setTitle(bill.getTitle());
		updats.setConsumer(bill.getConsumer());
		//updats.setEmployees(bill.getEmployees());
		updats.setItems(bill.getItems());
		Bill newBill = this.billServices.update(updats);
		return new ResponseEntity<Bill>(newBill, HttpStatus.OK);

	}

	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<String> deleteBill(@PathVariable("id") Long id) {
		this.billServices.delete(id);
		return new ResponseEntity<String>("success", HttpStatus.OK);

	}
	
	

}
