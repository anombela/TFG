#!/bin/bash

echo -e "
            SELECT count(total_amount) FROM taxis2016
            where total_amount < 40;
" | sqlcmd
