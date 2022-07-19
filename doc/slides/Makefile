all:
	pdflatex -shell-escape slides.tex
	pdflatex -shell-escape  slides.tex

clean:
	rm -f *.aux *.nav *.out *.snm *.toc *.log *.pyg *.dvi

mrproper: clean
	rm -f *.pdf
