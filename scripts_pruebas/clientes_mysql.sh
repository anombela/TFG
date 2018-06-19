#!/bin/bash

mysql -u root TFG_TAXIS -e "   SELECT count(total_amount) FROM taxis2016 where total_amount < 40;"
