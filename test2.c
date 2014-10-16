#include <avr/io.h>
#include <avr/interrupt.h>

int interr_count;
int halfSec_count;
 
ISR(TIMER2_OVF_vect){
	interr_count++;
	if (interr_count == 61){
		interr_count = 0;
		halfSec_count = 1;
	}
}

void nop(){
	asm volatile("nop");
}

void nop2(){
	asm volatile("nop");
}

void init(){
	DDRE = (1<<PE1)|(1<<PE2)|(1<<PE3);
	PORTE = (1<<PE1)|(1<<PE2)|(1<<PE3);
	DDRB = (0<<PB5)|(0<<PB6);
	PORTB = (1<<PB5)|(1<<PB6);
	PINB = (1<<PB5)|(1<<PB6);	// TODO delte it
  	TCCR2 = (1<<CS22)|(0<<CS21)|(1<<CS20); // настраиваем делитель
  	TIMSK |= (1<<TOIE2); // разрешаем прерывание по переполнению таймера
	interr_count = 0;
	halfSec_count = 0;
  	sei();                // выставляем бит общего разрешения прерываний
}
 
int main(){
	init();
  	while(1){
		wait_click(0);
	}             // вечный цикл
 	return 0;
}

void wait_click(int click_count){
	if (click_count){
		TCNT2 = 0;
		halfSec_count = 0;
		while(halfSec_count != 1){
			if (bit_is_clear(PINB, PB5)){
				if (click_count != 1) clear_all();
				btn_click(1, 2);
			}
			else if(bit_is_clear(PINB, PB6)){
				if (click_count != 2) clear_all();
				btn_click(2, 2);
			}
		}
		turn_on_wrong_light();
	}
	else{
		if (bit_is_clear(PINB, PB5)){
			btn_click(1, 1);
		}
		else if(bit_is_clear(PINB, PB6)){
			btn_click(2, 1);
		}
	}
}


void btn_click(int bnt_num, int click_count){
	TCNT2 = 0;
	halfSec_count = 0;
	while(halfSec_count != 2){
		if (bit_is_clear(PINB, PB5)) continue;
		else if(bit_is_clear(PINB, PB6)) continue;
		if (click_count == 2)	trun_in_right_light();
		else wait_click(bnt_num);
	}
	clear_all();
}

void trun_in_right_light(){
	nop();
}

void turn_on_wrong_light(){
	nop();
}

void clear_all(){
	nop();
}
