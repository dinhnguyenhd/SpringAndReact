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

import dinhnguyen.demo.entity.Goods;
import dinhnguyen.demo.services.GoodsService;

@RestController
@RequestMapping("/goods")
@CrossOrigin
public class GoodsController {

	@Autowired
	private GoodsService goodsService;

	@GetMapping(value = "/list")
	public ResponseEntity<List<Goods>> list() {
		List<Goods> list = this.goodsService.list();
		return new ResponseEntity<>(list, HttpStatus.OK);

	}

	@PostMapping(value = "/add")
	public ResponseEntity<Goods> addGoods(@RequestBody Goods goods) {
		Goods newGoods = this.goodsService.add(goods);
		return new ResponseEntity<Goods>(newGoods, HttpStatus.OK);

	}

	@GetMapping(value = "/getbyId/{id}")
	public ResponseEntity<Goods> GoodsById(@PathVariable("id") Long id) {
		Goods newGoods = this.goodsService.get(id);

		return new ResponseEntity<Goods>(newGoods, HttpStatus.OK);

	}

	@PutMapping(value = "/update")
	public ResponseEntity<Goods> updateGoods(@RequestBody Goods items) {
		Goods update = this.goodsService.get(items.getId());
		update.setCode(items.getCode());
		update.setName(items.getName());
		update.setPrice(items.getPrice());
		update.setQuantity(items.getQuantity());
		Goods newGoods = this.goodsService.update(update);
		return new ResponseEntity<Goods>(newGoods, HttpStatus.OK);

	}

	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<String> deleteGoods(@PathVariable("id") Long id) {
		this.goodsService.delete(id);
		return new ResponseEntity<String>("success", HttpStatus.OK);

	}

	@GetMapping(value = "/search/{code}/{name}/{page}")
	public ResponseEntity<List<Goods>> searchByConditions(@PathVariable("code") String code,
			@PathVariable("name") String name, @PathVariable("page") int page) {
		List<Goods> list = this.goodsService.searchByConditions(code, name, page);
		return new ResponseEntity<>(list, HttpStatus.OK);

	}

	@GetMapping(value = "/search/{code}/{name}")
	public ResponseEntity<Integer> numberOfRecord(@PathVariable("code") String code,
			@PathVariable("name") String name) {
		int total = this.goodsService.numberOfRecord(code, name);
		return new ResponseEntity<>(total, HttpStatus.OK);

	}

}
