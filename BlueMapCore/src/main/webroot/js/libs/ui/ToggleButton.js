/*
 * This file is part of BlueMap, licensed under the MIT License (MIT).
 *
 * Copyright (c) Blue (Lukas Rieger) <https://bluecolored.de>
 * Copyright (c) contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import $ from 'jquery';

import Button from './Button.js';

export default class ToggleButton extends Button {

	constructor(label, selected, onChange, icon){
		super(label, undefined, icon);
		this.selected = selected;
		this.onChangeListener = onChange;
	}

	createElement() {
		let element = super.createElement();

		element.addClass("toggle-button");
		if (this.selected) element.addClass("selected");
		$('<div class="switch"></div>').appendTo(element);
		element.click(this.onClick);

		return element;
	}

	isSelected(){
		return this.selected;
	}

	toggle(){
		this.selected = !this.selected;
		this.update();
	}

	update(){
		this.elements.forEach(element => {
			if (this.selected)
				element.addClass("selected");
			else
				element.removeClass("selected");
		});
	}

	onClick = () => {
		this.toggle();

		if (this.onChangeListener !== undefined && this.onChangeListener !== null){
			this.onChangeListener(this);
		}
	};

}